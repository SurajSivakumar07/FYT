import decryptAESData from "./decryptData";

// utils/dataMapper.js
const mapMemberProfile = (data) => {
  // Check if data is in old format (abbreviated keys) or new format
  const isOldFormat = data.member && "ip" in data.member;

  if (!isOldFormat) {
    return data; // Already in new format
  }

  return {
    member: {
      id: data.member.ip,
      member_id: data.member.md,
      name: data.member.ne,
      phone_number: decryptAESData(data.member.pn),
      dob: decryptAESData(data.member.db),
      email: decryptAESData(data.member.el),
      address: decryptAESData(data.member.ad),
      gender: data.member.gn,
      blood_group: data.member.bg,
      membership_plan_id: data.member.pl,
      start_date: data.member.sd,
      end_date: data.member.ed,
      status: data.member.st,
      type: data.member.tp,
      trainer_id: data.member.tr,
      created_at: data.member.ct,
      photo_url: data.member.ph,
      diet_chart: decryptAESData(data.member.dc),
      document_url: decryptAESData(data.member.du),
      occupation: decryptAESData(data.member.oc),
    },
    transactions:
      data.transactions?.map((transaction) => ({
        amount_paid: transaction.am,
        transaction_type: transaction.tt,
        payment_date: transaction.pd,
        status: transaction.st,
        balance: transaction.bl,
        discount: transaction.dc,
      })) || [],
    attendance:
      data.attendance?.map((att) => ({
        date: att.dt,
        check_in_time: att.ci,
        check_out_time: att.co,
      })) || [],
    trainer: data.trainer
      ? {
          id: data.trainer.ip,
          name: data.trainer.ne,
          phone: data.trainer.pn,
          email: data.trainer.el,
        }
      : null,
    plan: data.plan
      ? {
          name: data.plan.ne,
          duration_days: data.plan.dr,
          price: data.plan.pr,
        }
      : null,
  };
};

export default mapMemberProfile;
