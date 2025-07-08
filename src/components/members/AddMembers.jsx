import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  Users,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { usePlans } from "../../hooks/usePlans";
import { useTrainers } from "../../hooks/useTrainers";
import CustomDropdown from "./CustomDropdown";
import { useGymId } from "../../hooks/useGymId";
import { useMemberId } from "../../hooks/useMemberId";

export default function AddMembers() {
  const gymId = useGymId();
  console.log(gymId);

  const url = import.meta.env.VITE_API_URL;

  const { data: memberID, isLoading: meberIdLoading } = useMemberId(gymId);

  const [memberData, setMemberData] = useState({
    gym_id: gymId,
    member_id: "",
    name: "",
    phone_number: "",
    email: "",
    dob: "",
    gender: "",
    blood_group: "",
    address: "",
    membership_plan_id: null,
    start_date: "",
    end_date: "",
    status: "active",
    type: "regular",
    trainer_id: null,
    transaction: {
      member_id: "",
      gym_id: gymId,
      amount_paid: "",
      transaction_type: "",
      payment_date: "",
      status: "paid",
      balance: 0,
    },
    photo_url_1: null,
    photo_url_2: null,
  });
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isTrainerOpen, setIsTrainerOpen] = useState(false);
  const [isBloodGroupOpen, setIsBloodGroupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: plans = [], isLoading: plansLoading } = usePlans(gymId);
  const { data: trainers = [], isLoading: trainersLoading } =
    useTrainers(gymId);

  const calculateEndDate = (startDate, durationDays) => {
    if (!startDate || !durationDays) return "";
    const joinDate = new Date(startDate);
    if (isNaN(joinDate)) return "";
    const endDate = new Date(joinDate);
    endDate.setDate(joinDate.getDate() + parseInt(durationDays, 10));
    return endDate.toISOString().split("T")[0];
  };

  const calculateBalance = (planPrice, amountPaid) => {
    const paid = parseFloat(amountPaid) || 0;
    return Math.floor(Math.max(0, planPrice - paid));
  };

  const convertToISODate = (inputDate) => {
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      console.error("Invalid date input:", inputDate);
      return "";
    }
    return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      { key: "member_id", label: "Member ID" },
      { key: "name", label: "Full Name" },
      { key: "phone_number", label: "Phone Number" },
      { key: "email", label: "Email Address" },
      { key: "dob", label: "Date of Birth" },
      { key: "gender", label: "Gender" },
      { key: "blood_group", label: "Blood Group" },
      { key: "address", label: "Address" },
      { key: "membership_plan_id", label: "Membership Plan" },
      { key: "start_date", label: "Start Date" },
      { key: "end_date", label: "End Date" },
      { key: "type", label: "Membership Type" },
      { key: "amount_paid", label: "Amount Paid", nested: "transaction" },
      {
        key: "transaction_type",
        label: "Payment Method",
        nested: "transaction",
      },
      { key: "payment_date", label: "Payment Date", nested: "transaction" },
    ];

    if (memberData.type === "pt") {
      requiredFields.push({ key: "trainer_id", label: "Trainer" });
    }

    requiredFields.forEach(({ key, label, nested }) => {
      const value = nested ? memberData[nested][key] : memberData[key];
      if (!value || value === "") {
        newErrors[key] = `${label} is required`;
      }
    });

    if (
      memberData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (
      memberData.phone_number &&
      !/^\+?\d{10,15}$/.test(memberData.phone_number)
    ) {
      newErrors.phone_number = "Invalid phone number";
    }

    if (
      memberData.transaction.amount_paid &&
      parseFloat(memberData.transaction.amount_paid) < 0
    ) {
      newErrors.amount_paid = "Amount paid cannot be negative";
    }

    if (memberData.start_date && memberData.end_date) {
      const start = new Date(memberData.start_date);
      const end = new Date(memberData.end_date);
      if (end < start) {
        newErrors.end_date = "End date cannot be before start date";
      }
    }

    if (!["regular", "pt", "sm"].includes(memberData.type)) {
      newErrors.type = "Membership type must be Regular, PT, or SM";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (memberID?.member_code) {
      setMemberData((prev) => ({
        ...prev,
        member_id: memberID.member_code,
      }));
    }
  }, [memberID]);
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    let endDate = "";
    if (startDate && memberData.membership_plan_id) {
      const selectedPlan = plans.find(
        (plan) => plan.id === memberData.membership_plan_id
      );
      if (selectedPlan) {
        endDate = calculateEndDate(startDate, selectedPlan.duration_days);
      }
    }
    setMemberData((prev) => ({
      ...prev,
      start_date: startDate,
      end_date: endDate,
      transaction: { ...prev.transaction, payment_date: startDate },
    }));
    setErrors((prev) => ({
      ...prev,
      start_date: "",
      end_date: "",
      payment_date: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({
      ...prev,
      [name]: value,
      transaction: {
        ...prev.transaction,
        member_id: name === "member_id" ? value : prev.transaction.member_id,
      },
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => {
      const selectedPlan = plans.find(
        (plan) => plan.id === prev.membership_plan_id
      );
      const planPrice = selectedPlan ? parseFloat(selectedPlan.price) || 0 : 0;
      const updatedTransaction = {
        ...prev.transaction,
        [name]: value,
      };
      if (name === "amount_paid") {
        updatedTransaction.balance = calculateBalance(
          planPrice,
          updatedTransaction.amount_paid
        );
        updatedTransaction.status =
          updatedTransaction.balance > 0 ? "pending" : "paid";
      }
      return {
        ...prev,
        transaction: updatedTransaction,
      };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");
    setSubmissionSuccess(false);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      const firstErrorField = Object.keys(errors)[0];
      const errorElement =
        document.querySelector(`[name="${firstErrorField}"]`) ||
        document.querySelector(`[data-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const payload = {
      ...memberData,
      gym_id: parseInt(memberData.gym_id),
      membership_plan_id: parseInt(memberData.membership_plan_id),
      trainer_id: memberData.trainer_id
        ? parseInt(memberData.trainer_id)
        : null,
      dob: convertToISODate(memberData.dob),
      start_date: convertToISODate(memberData.start_date),
      end_date: convertToISODate(memberData.end_date),
      transaction: {
        ...memberData.transaction,
        gym_id: parseInt(memberData.gym_id),
        member_id: memberData.member_id,
        amount_paid: parseFloat(memberData.transaction.amount_paid) || 0,
        balance: parseInt(memberData.transaction.balance) || 0,
        payment_date: convertToISODate(memberData.transaction.payment_date),
      },
      photo_url_1: memberData.photo_url_1,
      photo_url_2: memberData.photo_url_2,
    };
    console.log(payload);

    try {
      const response = await axios.post(`${url}/members`, payload);
      setSubmissionSuccess(true);
      setMemberData({
        gym_id: gymId,
        member_id: "",
        name: "",
        phone_number: "",
        email: "",
        dob: "",
        gender: "",
        blood_group: "",
        address: "",
        membership_plan_id: null,
        start_date: "",
        end_date: "",
        status: "active",
        type: "regular",
        trainer_id: null,
        transaction: {
          member_id: "",
          gym_id: gymId,
          amount_paid: "",
          transaction_type: "",
          payment_date: "",
          status: "paid",
          balance: 0,
        },
        photo_url_1: null,
        photo_url_2: null,
      });
      setErrors({});
    } catch (err) {
      console.error("Error submitting member:", err);
      if (err.response?.status === 405) {
        setSubmissionError(
          "Method Not Allowed. Verify the endpoint supports POST."
        );
      } else if (err.response?.status === 400) {
        setSubmissionError(
          `Invalid data: ${err.response.data.detail || err.message}`
        );
      } else if (err.response?.status === 401) {
        setSubmissionError("Unauthorized. Please check your access token.");
      } else {
        setSubmissionError(`Failed to register member: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-md">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            New Member Registration
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="member_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member ID
                </label>
                <input
                  id="member_id"
                  type="text"
                  name="member_id"
                  placeholder="Enter Member ID"
                  value={memberData.member_id}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 shadow-sm hover:border-blue-400 ${
                    errors.member_id ? "border-red-500" : ""
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.member_id}
                />
                {errors.member_id && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.member_id}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={memberData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 shadow-sm hover:border-blue-400 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    id="phone_number"
                    type="tel"
                    name="phone_number"
                    placeholder="Enter phone number"
                    value={memberData.phone_number}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 shadow-sm hover:border-blue-400 ${
                      errors.phone_number ? "border-red-500" : ""
                    }`}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.phone_number}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone_number}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={memberData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 shadow-sm hover:border-blue-400 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={memberData.dob}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 shadow-sm hover:border-blue-400 ${
                      errors.dob ? "border-red-500" : ""
                    }`}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.dob}
                  />
                </div>
                {errors.dob && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.dob}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={memberData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 border-b border-gray-200"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter complete address"
                  value={memberData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 resize-none shadow-sm hover:border-blue-400 ${
                    errors.address ? "border-red-500" : ""
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.address}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="blood_group"
                className="block text-sm font-medium text-gray-700"
              >
                Blood Group
              </label>
              <CustomDropdown
                id="blood_group"
                value={memberData.blood_group}
                onChange={(value) => {
                  setMemberData((prev) => ({ ...prev, blood_group: value }));
                  setErrors((prev) => ({ ...prev, blood_group: "" }));
                }}
                options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => ({ value: group, label: group })
                )}
                placeholder="Select Blood Group"
                error={errors.blood_group}
                isOpen={isBloodGroupOpen}
                setIsOpen={setIsBloodGroupOpen}
                isLoading={false}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
              <Users className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Membership Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CustomDropdown
                id="membership_plan_id"
                value={
                  plans.find(
                    (plan) => plan.id === memberData.membership_plan_id
                  )?.name || ""
                }
                onChange={(planId) => {
                  const selectedPlan = plans.find((plan) => plan.id === planId);
                  if (selectedPlan) {
                    const planPrice = parseFloat(selectedPlan.price) || 0;
                    const amountPaid = planPrice.toFixed(2);
                    const balance = calculateBalance(planPrice, amountPaid);
                    setMemberData((prev) => ({
                      ...prev,
                      membership_plan_id: parseInt(selectedPlan.id),
                      transaction: {
                        ...prev.transaction,
                        amount_paid: amountPaid,
                        balance: balance,
                        status: balance > 0 ? "pending" : "paid",
                      },
                    }));
                    if (memberData.start_date) {
                      const endDate = calculateEndDate(
                        memberData.start_date,
                        selectedPlan.duration_days
                      );
                      setMemberData((prev) => ({ ...prev, end_date: endDate }));
                    }
                  }
                  setErrors((prev) => ({ ...prev, membership_plan_id: "" }));
                }}
                options={plans.map((plan) => ({
                  value: plan.id,
                  label: `${plan.name} - ₹${plan.price} (${plan.duration_days} days)`,
                }))}
                placeholder="Select Plan"
                error={errors.membership_plan_id}
                isOpen={isPlansOpen}
                setIsOpen={setIsPlansOpen}
                isLoading={plansLoading}
              />

              <div className="space-y-2">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  id="start_date"
                  type="date"
                  name="start_date"
                  value={memberData.start_date}
                  onChange={handleStartDateChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-gray-900 shadow-sm hover:border-purple-400 ${
                    errors.start_date ? "border-red-500" : ""
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.start_date}
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  id="end_date"
                  type="date"
                  name="end_date"
                  value={memberData.end_date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-gray-900 shadow-sm hover:border-purple-400 ${
                    errors.end_date ? "border-red-500" : ""
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.end_date}
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.end_date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Membership Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={memberData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 border-b border-gray-200"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.type}
                >
                  <option value="regular">Regular Membership</option>
                  <option value="pt">Personal Training</option>
                  <option value="sm">Special Membership</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.type}
                  </p>
                )}
              </div>

              {memberData.type === "pt" && (
                <CustomDropdown
                  id="trainer_id"
                  value={
                    trainers.find(
                      (trainer) => trainer.id == memberData.trainer_id
                    )?.name || ""
                  }
                  onChange={(trainerId) => {
                    setMemberData((prev) => ({
                      ...prev,
                      trainer_id: parseInt(trainerId),
                    }));
                    setErrors((prev) => ({ ...prev, trainer_id: "" }));
                  }}
                  options={trainers.map((trainer) => ({
                    value: trainer.id,
                    label: trainer.name,
                  }))}
                  placeholder="Select Trainer"
                  error={errors.trainer_id}
                  isOpen={isTrainerOpen}
                  setIsOpen={setIsTrainerOpen}
                  isLoading={trainersLoading}
                />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
              <CreditCard className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="amount_paid"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount Paid
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-gray-400 font-medium">
                    ₹
                  </span>
                  <input
                    id="amount_paid"
                    type="number"
                    name="amount_paid"
                    placeholder="0.00"
                    value={memberData.transaction.amount_paid}
                    onChange={handleTransactionChange}
                    className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-400 text-gray-900 shadow-sm hover:border-green-400 ${
                      errors.amount_paid ? "border-red-500" : ""
                    }`}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.amount_paid}
                    min="0"
                  />
                </div>
                {errors.amount_paid && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.amount_paid}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="balance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-gray-400 font-medium">
                    ₹
                  </span>
                  <input
                    id="balance"
                    type="number"
                    name="balance"
                    value={memberData.transaction.balance}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 placeholder-gray-400 text-gray-900 shadow-sm"
                    readOnly
                    aria-readonly="true"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="transaction_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment Method
                </label>
                <select
                  id="transaction_type"
                  name="transaction_type"
                  value={memberData.transaction.transaction_type}
                  onChange={handleTransactionChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-400 border-b border-gray-200"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.transaction_type}
                >
                  <option value="">Select Payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Debit/Credit Card</option>
                  <option value="UPI">UPI Payment</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
                {errors.transaction_type && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.transaction_type}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="payment_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment Date
                </label>
                <input
                  id="payment_date"
                  type="date"
                  name="payment_date"
                  value={memberData.transaction.payment_date}
                  onChange={handleTransactionChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-900 shadow-sm hover:border-green-400 ${
                    errors.payment_date ? "border-red-500" : ""
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.payment_date}
                />
                {errors.payment_date && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.payment_date}
                  </p>
                )}
              </div>
            </div>
          </div>
          {submissionSuccess && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center rounded-lg shadow-sm">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p>Member registered successfully!</p>
            </div>
          )}
          {submissionError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center rounded-lg shadow-sm">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>{submissionError}</p>
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={plansLoading || trainersLoading || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Registering...
                </span>
              ) : (
                "Register New Member"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
