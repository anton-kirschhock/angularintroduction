using System.Collections.Generic;
using AngularIntro.Data;
using AngularIntro.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularIntro.Controllers
{
  [Route("api/users")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    // GET api/users
    [HttpGet]
    public ActionResult<IEnumerable<User>> Get()
      => Ok(UsersData.Users);
  }
}
