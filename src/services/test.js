const jwt = require("jsonwebtoken");


const payload = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzZlMmY1MTE5YjhjNDFhMjk0NGQwYzYiLCJpYXQiOjE2NjgxNzUyMjgsImV4cCI6MTY2ODE3NTIyOX0.-puVqTnKYF5BUk7hycrVNOFeXcbM4RobPDn-ctLLhN8",
  "kanov498n9wsfgh3sfdbsd4hsdghf456u6umw45ydwe5ue86uhwe5yiwwh5h94yq34w45y9bgw35tw4tyh9w4h5yw48g"
);
console.log(payload)