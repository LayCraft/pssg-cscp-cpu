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

                for (int i = 0; i < portalModel.DocumentCollection.Length; ++i)
                {
                    byteArray.Add(System.Convert.FromBase64String(portalModel.DocumentCollection[i].body));
                }



                string signatureString = portalModel.Signature.vsd_authorizedsigningofficersignature;
                signatureString = signatureString.Replace("data:image/png;base64,", "");
                var offset = signatureString.IndexOf(',') + 1;
                var imageInBytes = System.Convert.FromBase64String(signatureString.Substring(offset));

                // byteArray.Add(System.Convert.FromBase64String(portalModel.Signature.vsd_authorizedsigningofficersignature));
                // byteArray.Add(imageInBytes);

                byte[] combinedArray = concatAndAddContent(byteArray, imageInBytes);

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
                // if (!string.IsNullOrEmpty(modelString))
                //     return StatusCode(200, "test complete");

                DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

                return StatusCode(200, result.result.ToString());
            }
            catch (System.Exception exception)
            {
                // Console.WriteLine(exception);
                throw;
            }
            finally { }
        }

        [HttpPost]
        public async Task<IActionResult> SetFiles([FromBody] FilePost model)
        {
            // return null because this needs to be handled as files.
            try
            {
                string endpointUrl = "vsd_SetCPUOrgContracts";

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

        public static byte[] concatAndAddContent(List<byte[]> pdfByteContent, byte[] signature)
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
                            var document = new iTextSharp.text.Document(PageSize.A4, 10f, 10f, 140f, 30f);
                            iTextSharp.text.pdf.PdfWriter.GetInstance(document, second_ms).SetFullCompression();
                            document.Open();
                            var image = iTextSharp.text.Image.GetInstance(signature);
                            document.Add(image);
                            document.Close();

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