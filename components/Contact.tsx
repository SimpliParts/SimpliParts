import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { ViewState } from '../App';

interface ContactProps {
  setCurrentView: (view: ViewState) => void;
}

export const Contact: React.FC<ContactProps> = ({ setCurrentView }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // For now, just show an alert
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-[calc(100vh-72px)] pt-[72px] bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Get In Touch</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to transform your parts procurement process? We'd love to hear from you.
            Reach out and let's discuss how SimpliParts can help your shop.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <p className="text-slate-600 mb-8">
                Whether you're ready to get started or just have questions about how SimpliParts
                can help your auto repair shop, we're here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600">hello@simpliparts.com</p>
                  <p className="text-slate-600">support@simpliparts.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                  <p className="text-slate-600">(555) 123-AUTO</p>
                  <p className="text-sm text-slate-500">Mon-Fri, 8AM-6PM CST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
                  <p className="text-slate-600">Chicago, Illinois</p>
                  <p className="text-slate-600">Serving auto repair shops nationwide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Response Time</h3>
                  <p className="text-slate-600">We typically respond within 24 hours</p>
                  <p className="text-slate-600">Priority support for active customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                  Company/Shop Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your auto repair shop name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell us about your shop, your current challenges, or any questions you have about SimpliParts"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>

            <p className="text-sm text-slate-500 mt-4">
              * Required fields. We respect your privacy and will never share your information.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">How quickly can we get started?</h3>
              <p className="text-slate-600">
                Most shops are up and running within 24-48 hours of signup. Our onboarding process is designed to be quick and painless.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Do you work with all shop management systems?</h3>
              <p className="text-slate-600">
                We integrate with Tekmetric and have APIs available for other systems. If you don't see your platform listed, contact us - we can likely add support.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">What's your refund policy?</h3>
              <p className="text-slate-600">
                We offer a 14-day free trial, and if you're not completely satisfied, we'll work with you to make it right or provide a full refund within 30 days.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">How secure is our data?</h3>
              <p className="text-slate-600">
                Security is our top priority. We use enterprise-grade encryption, SOC 2 compliant hosting, and never sell or share your data. Check out our Security page for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};