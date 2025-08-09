import decryptAESData from "./decryptData";

// utils/trainerMapper.js
const mapTrainerData = (trainers) => {
  return trainers.map((trainer) => ({
    id: trainer.ip,
    name: trainer.ne,
    phone: decryptAESData(trainer.pn), // This will be encrypted - handle decryption as needed
    email: decryptAESData(trainer.el), // This will be encrypted - handle decryption as needed
    specialty: trainer.sp,
  }));
};

export default mapTrainerData;
