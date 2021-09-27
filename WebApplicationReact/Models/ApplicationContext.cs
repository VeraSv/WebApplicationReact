using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WinAppReact.Models
{
    public class FileHelper
    {
        const string errorEmpty = "List is empty\n";

        public static void Save(Employee emploeer)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                db.Employees.Add(emploeer);
                db.SaveChanges();
            }
        }
        public static Array View()
        {
            List<Employee> list = new List<Employee>();
            using (ApplicationContext db = new ApplicationContext())
            {
                string[] list1 = new string[] { "" };
                list = db.Employees.ToList();
                if (list != null)
                {
                    if (list.Any())
                    {
                        string[] users = new string[list.Count];
                        for (int i = 0; i < list.Count; i++)
                        {
                            users[i] = list[i].Name + " " + list[i].Age + " " + list[i].Car.ToString();

                        }
                        return users;


                    }

                    else return list1;
                }

                else return list1;
            }

        }

        public static List<string> Find(string info)
        {


            using (ApplicationContext db = new ApplicationContext())
            {
                List<string> users = new List<string>();
                var list = db.Employees.ToList();
                if (list.Any())
                {
                    for (int i = 0; i < list.Count; i++)
                    {
                        if (info == list[i].Name || info == list[i].Age.ToString() || info == list[i].Car.ToString())
                        {

                            users.Add(list[i].Name + " " + list[i].Age + " " + list[i].Car.ToString());

                        }
                    }
                    return users;



                }
                else return users;
            }


        }
        public static string Delete(string name)
        {

            using (ApplicationContext db = new ApplicationContext())
            {

                var Employees = db.Employees.ToList();
                if (Employees.Any())
                {
                    foreach (Employee emp in Employees)
                    {
                        if (name == emp.Name)
                            db.Remove(emp);

                    }
                    db.SaveChanges();
                    return "Deleted successfully!";

                }
                else return errorEmpty;
            }
        }
    }
    public class ApplicationContext : DbContext
    {

        public DbSet<Employee> Employees { get; set; }
        public ApplicationContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=winappsql;Trusted_Connection=True;");
        }
    }
}