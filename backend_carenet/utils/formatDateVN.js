exports.formatDateVN = (dateString) => {
   return new Date(dateString).toLocaleDateString("vi-VN", {
     year: "numeric",
     month: "2-digit",
     day: "2-digit",
   })
 }
 