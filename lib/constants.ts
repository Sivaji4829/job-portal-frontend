/**
 * Shared constants and Type definitions for the HireSync CMS.
 */

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type JobInput = Omit<Job, '_id' | 'createdAt' | 'updatedAt'>;

export interface AppNotification {
  msg: string;
  type: 'success' | 'error';
}

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance'
] as const;

export const LOCATIONS = [
  'Remote',
  'New York, NY',
  'San Francisco, CA',
  'London, UK',
  'Bangalore, IN',
  'Berlin, DE',
  'Singapore, SG',
  'Toronto, CA',
  'Austin, TX',
  'Dublin, IE'
] as const;

export const SALARY_RANGES = [
  '₹3 LPA - ₹5 LPA',
  '₹5 LPA - ₹8 LPA',
  '₹8 LPA - ₹12 LPA',
  '₹12 LPA - ₹18 LPA',
  '₹18 LPA - ₹25 LPA',
  '₹25 LPA - ₹40 LPA',
  '₹40 LPA - ₹60 LPA',
  '₹60 LPA+'
] as const;


export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://job-portal-backend-2uzz.onrender.com/api',
  TIMEOUT: 10000,
};