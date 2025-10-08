export function formatCustomDate(dateStr: string): string {
    const date = new Date(dateStr);
  
    const day = date.getDate().toString().padStart(2, "0"); // e.g., 06
    const month = date.toLocaleString("en-US", { month: "long" }); // e.g., January
    const year = date.getFullYear(); // e.g., 2025
  
    return `${day} ${month} ${year}`;
  }

  export function daysDifference(date1: string | Date, date2: string | Date): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if(d1.getTime() === d2.getTime()) {
        return 1;
    }
  
    // Get the difference in milliseconds
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
  
    // Convert milliseconds to days
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
    return diffDays;
  }
  export function formatTimeRange(timeRange: string): string {
    const [start, end] = timeRange.split(" - ").map(t => t.trim());
  
    const formatTime = (time24: string) => {
      const [hourStr, minute] = time24.split(":");
      let hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12; // Convert 0 -> 12 for 12 AM, 13 -> 1 PM, etc.
      return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
    };
  
    return `${formatTime(start)} - ${formatTime(end)}`;
  }