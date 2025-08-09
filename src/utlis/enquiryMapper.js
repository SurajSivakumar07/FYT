const mapEnquiryData = (enquiries) => {
  return enquiries.map((enquiry) => ({
    id: enquiry.ip,
    gym_id: enquiry.gi,
    name: enquiry.ne,
    phone_number: enquiry.pn, // Encrypted - handle decryption as needed
    message: enquiry.ms,
    enquiry_date: enquiry.ed,
    status: enquiry.st,
    priority: enquiry.pr,
  }));
};

export default mapEnquiryData;
