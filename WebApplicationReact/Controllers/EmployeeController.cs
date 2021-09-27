using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WinAppReact.Models;
using Microsoft.EntityFrameworkCore;
using WinAppReact;

namespace WebApplicationReact.Controllers
{

    public class EmployeeController : Controller

    {
       
        [HttpGet]
        [Route("api/Employee/View")]
        public Array ViewEmployees()
        {
            return FileHelper.View();
        }
        [HttpPost]
        [Route("api/Employee/Save")]
        public void Save(Employee emploeer)
        {
            FileHelper.Save(emploeer);
        }
        [HttpGet]
        [Route("api/Employee/Find/{info}")]
        public List<string> Find(string info)
        {
            return FileHelper.Find(info);
        }

        [HttpDelete]
        [Route("api/Employee/Delete/{name}")]
        public string Delete(string name)
        {
            return FileHelper.Delete(name);
        }

    }
}
