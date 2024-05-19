namespace Together.Core.Models.FilterModels;

public class EventFilterDto
{ 
        public int? SportId { get; set; } 
        public int? SportExperienceId { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
}