'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    ieeeId: '',
    collegeEmail: '',
    phone: '',
    yearOfStudy: '',
    department: '',
    position: '',
    committee: '',
    experience: '',
    motivation: '',
    goals: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateIEEEId = (id) => /^\d{8,}$/.test(id);
  const validateCollegeEmail = (email) => email.endsWith('@yourcollege.edu');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Required';
    if (!formData.ieeeId || !validateIEEEId(formData.ieeeId))
      newErrors.ieeeId = 'Valid IEEE Membership ID required';
    if (!formData.collegeEmail || !validateCollegeEmail(formData.collegeEmail))
      newErrors.collegeEmail = 'Valid college email required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-2 sm:px-4 relative">
      <Head>
        <title>Apply for IEEE Student Branch Positions</title>
      </Head>
      {/* Responsive Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link href="/" aria-label="Go to homepage">
          <img
            src="/image.png"
            alt="IEEE Logo"
            className="h-10 w-auto sm:h-12 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto bg-gray-800 border-4 border-blue-900 rounded-2xl shadow-xl overflow-hidden text-white mt-16 sm:mt-20">
          {/* Header */}
          <div className="bg-blue-900 p-4 sm:p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">IEEE Student Branch Application</h1>
            <p className="opacity-90 text-sm sm:text-base">Join our team and help shape the future of technology at our university</p>
          </div>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
                {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
              </div>
              {/* IEEE Membership ID */}
              <div>
                <label className="block mb-2 font-medium">IEEE Membership ID</label>
                <input
                  type="text"
                  name="ieeeId"
                  value={formData.ieeeId}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  placeholder="e.g., 12345678"
                />
                {errors.ieeeId && <p className="text-red-400 text-sm">{errors.ieeeId}</p>}
              </div>
              {/* College Email */}
              <div>
                <label className="block mb-2 font-medium">College Email</label>
                <input
                  type="email"
                  name="collegeEmail"
                  value={formData.collegeEmail}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  placeholder="yourname@yourcollege.edu"
                />
                {errors.collegeEmail && <p className="text-red-400 text-sm">{errors.collegeEmail}</p>}
              </div>
              {/* Phone */}
              <div>
                <label className="block mb-2 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>
              {/* Year of Study */}
              <div>
                <label className="block mb-2 font-medium">Year of Study</label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              {/* Department */}
              <div>
                <label className="block mb-2 font-medium">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>
              {/* Position */}
              <div>
                <label className="block mb-2 font-medium">Position Applying For</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  placeholder="e.g., Chair, Secretary"
                />
              </div>
              {/* Committee */}
              <div>
                <label className="block mb-2 font-medium">Preferred Committee</label>
                <input
                  type="text"
                  name="committee"
                  value={formData.committee}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  placeholder="e.g., Technical, Events"
                />
              </div>
            </div>
            {/* Experience */}
            <div className="mt-4 sm:mt-6">
              <label className="block mb-2 font-medium">Relevant Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                placeholder="Tell us about your experience"
              />
            </div>
            {/* Motivation */}
            <div className="mt-4 sm:mt-6">
              <label className="block mb-2 font-medium">Why do you want to join?</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                placeholder="Share your motivation"
              />
            </div>
            {/* Goals */}
            <div className="mt-4 sm:mt-6">
              <label className="block mb-2 font-medium">What are your goals?</label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 sm:p-3 rounded bg-gray-900 text-white border border-blue-900 focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                placeholder="Share your goals"
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-end mt-6 sm:mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 disabled:opacity-50 w-full sm:w-auto"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Footer Note */}
      <div className="mt-8 text-center text-gray-300 text-xs sm:text-sm">
        <p>
          Need help?{' '}
          <a href="mailto:ieee@yourcollege.edu" className="text-blue-400 hover:underline">
            ieee@yourcollege.edu
          </a>
        </p>
      </div>
    </div>
  );
}
