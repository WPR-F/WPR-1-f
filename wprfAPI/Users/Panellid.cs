using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace wprfAPI.Users
{
    public class Panellid
    {
        [Key]
        [ForeignKey("User")]
        public string UserId { get; set; } // Primary key and foreign key to User
        public string? postalCode { get; set; }
        public string? phoneNumber { get; set; }
        public string? DisabilityType { get; set; }
        public string? Tools { get; set; }
        public string? condition { get; set; }
        public string? ResearchType { get; set; }
        public string? PreferdresearchApproach { get; set; }
        public bool? CommercialApproach { get; set; }
        public string? Availibility { get; set; }
    }
}