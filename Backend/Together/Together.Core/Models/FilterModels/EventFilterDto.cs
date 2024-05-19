namespace Together.Core.Models.FilterModels;

public class EventFilterDto
{ 
        public int? SportId { get; set; } 
        public int? SportExperienceId { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
}