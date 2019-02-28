using System;

namespace AngularIntro.Models
{
  public class User
  {
    public int Id { get; set; }
    public string name { get; set; }
    public string firstName { get; set; }
    public string email { get; set; }
    public string dateOfBirth { get; set; }

    public User(int id, string name, string firstName, string email, string dateOfBirth)
    {
      Id = id;
      this.name = name ?? throw new ArgumentNullException(nameof(name));
      this.firstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
      this.email = email ?? throw new ArgumentNullException(nameof(email));
      this.dateOfBirth = dateOfBirth ?? throw new ArgumentNullException(nameof(dateOfBirth));
    }

    public User() { }
  }
}
