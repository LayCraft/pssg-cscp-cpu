using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System;

namespace Gov.Cscp.Victims.Public.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class DynamicsFileController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDynamicsResultService _dynamicsResultService;
        private readonly IConfiguration _configuration;

        public DynamicsFileController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IDynamicsResultService dynamicsResultService)
        {
            this._httpContextAccessor = httpContextAccessor;
            this._configuration = configuration;
            this._dynamicsResultService = dynamicsResultService;
        }

        [HttpGet("{businessBceid}/{userBceid}/{contractId}")]
        public async Task<IActionResult> GetFile(string userBceid, string businessBceid, string contractId)
        {
            try
            {
                // convert the parameters to a json string
                string requestJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
                // set the endpoint action
                string endpointUrl = "vsd_contracts(" + contractId + ")/Microsoft.Dynamics.CRM.vsd_GetCPUContractDocuments";

                // get the response
                DynamicsResult result = await _dynamicsResultService.GetResultAsync(endpointUrl, requestJson);

                return StatusCode(200, result.result.ToString());
            }
            finally { }
        }

        [HttpGet("contract_package/{businessBceid}/{userBceid}/{taskId}")]
        public async Task<IActionResult> GetContractPackage(string userBceid, string businessBceid, string taskId)
        {
            try
            {
                // convert the parameters to a json string
                string requestJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
                // set the endpoint action
                string endpointUrl = "tasks(" + taskId + ")/Microsoft.Dynamics.CRM.vsd_GetCPUContractPackage";

                // get the response
                DynamicsResult result = await _dynamicsResultService.GetResultAsync(endpointUrl, requestJson);

                return StatusCode(200, result.result.ToString());
            }
            finally { }
        }

        [HttpPost("signed_contract/{taskId}")]
        public async Task<IActionResult> UploadSignedContract([FromBody] SignedContractPostFromPortal portalModel, string taskId)
        {
            // return null because this needs to be handled as files.
            try
            {
                if (portalModel == null)
                {
                    return StatusCode(502);
                }

                string endpointUrl = "tasks(" + taskId + ")/Microsoft.Dynamics.CRM.vsd_UploadCPUContractPackage";


                SignedContractPostToDynamics data = new SignedContractPostToDynamics();
                data.BusinessBCeID = portalModel.BusinessBCeID;
                data.UserBCeID = portalModel.UserBCeID;

                List<byte[]> byteArray = new List<byte[]>();

                for (int i = 0; i < portalModel.DocumentCollection.Length - 1; ++i)
                {
                    byteArray.Add(System.Convert.FromBase64String(portalModel.DocumentCollection[i].body));
                }

                byte[] signaturePage = System.Convert.FromBase64String(portalModel.DocumentCollection[portalModel.DocumentCollection.Length - 1].body);



                string signatureString = portalModel.Signature.vsd_authorizedsigningofficersignature;
                signatureString = signatureString.Replace("data:image/png;base64,", "");
                var offset = signatureString.IndexOf(',') + 1;
                var signatureImage = System.Convert.FromBase64String(signatureString.Substring(offset));

                byte[] combinedArray = concatAndAddContent(byteArray, signaturePage, signatureImage, portalModel.Signature.vsd_signingofficersname, portalModel.Signature.vsd_signingofficertitle);

                string combinedDoc = System.Convert.ToBase64String(combinedArray);

                data.SignedContract = new DynamicsDocumentPost();
                data.SignedContract.body = combinedDoc;
                data.SignedContract.filename = "Merged Contract.pdf";

                //for testing the document combining
                // return StatusCode(200, data);

                // make options for the json serializer
                JsonSerializerOptions options = new JsonSerializerOptions();
                options.IgnoreNullValues = true;
                // turn the model into a string
                string modelString = System.Text.Json.JsonSerializer.Serialize(data, options);

                DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

                return StatusCode(200, result.result.ToString());
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                throw;
            }
            finally { }
        }

        [HttpPost("account/{accountId}")]
        public async Task<IActionResult> UploadAccountDocument([FromBody] FilePost model, string accountId)
        {
            // return null because this needs to be handled as files.
            try
            {
                string endpointUrl = endpointUrl = "accounts(" + accountId + ")/Microsoft.Dynamics.CRM.vsd_UploadCPUAccountDocuments";

                // make options for the json serializer
                JsonSerializerOptions options = new JsonSerializerOptions();
                options.IgnoreNullValues = true;
                // turn the model into a string
                string modelString = System.Text.Json.JsonSerializer.Serialize(model, options);
                DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

                return StatusCode(200, result.result.ToString());
            }
            finally { }
        }

        [HttpPost("contract/{contractId}")]
        public async Task<IActionResult> UploadContractDocument([FromBody] FilePost model, string contractId)
        {
            // return null because this needs to be handled as files.
            try
            {
                string endpointUrl = endpointUrl = "vsd_contracts(" + contractId + ")/Microsoft.Dynamics.CRM.vsd_UploadCPUContractDocuments";

                // make options for the json serializer
                JsonSerializerOptions options = new JsonSerializerOptions();
                options.IgnoreNullValues = true;
                // turn the model into a string
                string modelString = System.Text.Json.JsonSerializer.Serialize(model, options);
                DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

                return StatusCode(200, result.result.ToString());
            }
            finally { }
        }

        public static byte[] concatAndAddContent(List<byte[]> pdfByteContent, byte[] signaturePage, byte[] signature, String signingOfficerName, String signingOfficerTitle)
        {
            using (var ms = new MemoryStream())
            {
                using (var doc = new Document())
                {
                    using (var copy = new PdfSmartCopy(doc, ms))
                    {
                        doc.Open();

                        //Loop through each byte array
                        foreach (var p in pdfByteContent)
                        {

                            //Create a PdfReader bound to that byte array
                            using (var reader = new PdfReader(p))
                            {

                                //Add the entire document instead of page-by-page
                                copy.AddDocument(reader);
                            }
                        }

                        using (var second_ms = new MemoryStream())
                        {
                            PdfReader pdfr = new PdfReader(signaturePage);
                            PdfStamper pdfs = new PdfStamper(pdfr, second_ms);
                            Image image = iTextSharp.text.Image.GetInstance(signature);
                            Rectangle rect;
                            PdfContentByte content;

                            rect = pdfr.GetPageSize(1);
                            content = pdfs.GetOverContent(1);

                            image.SetAbsolutePosition(84.0F, 476.0F);
                            image.ScalePercent(29.0F, 25.0F);

                            content.AddImage(image);

                            PdfLayer layer = new PdfLayer("info-layer", pdfs.Writer);
                            content.BeginLayer(layer);
                            content.SetFontAndSize(BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED), 20);

                            String[] months = { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };

                            DateTime today = DateTime.Now;
                            String monthString = months[today.Month - 1];
                            var now = DateTime.Now;
                            String daySuffix = (now.Day % 10 == 1 && now.Day != 11) ? "st"
                            : (now.Day % 10 == 2 && now.Day != 12) ? "nd"
                            : (now.Day % 10 == 3 && now.Day != 13) ? "rd"
                            : "th";
                            String dayString = today.Day.ToString() + daySuffix;

                            content.SetColorFill(BaseColor.BLACK);
                            content.BeginText();
                            content.SetFontAndSize(BaseFont.CreateFont(), 9);
                            content.ShowTextAligned(PdfContentByte.ALIGN_LEFT, signingOfficerName, 84.0F, 420.0F, 0.0F);
                            content.ShowTextAligned(PdfContentByte.ALIGN_LEFT, signingOfficerTitle, 84.0F, 370.0F, 0.0F);
                            content.ShowTextAligned(PdfContentByte.ALIGN_LEFT, dayString, 148.0F, 625.0F, 0.0F);
                            content.ShowTextAligned(PdfContentByte.ALIGN_RIGHT, monthString, 285.0F, 625.0F, 0.0F);
                            content.EndText();

                            content.EndLayer();

                            pdfs.Close();

                            using (var reader = new PdfReader(second_ms.ToArray()))
                            {
                                //Add the entire document instead of page-by-page
                                copy.AddDocument(reader);
                            }
                        }

                        doc.Close();
                    }
                }

                //Return just before disposing
                return ms.ToArray();
            }
        }

    }
}