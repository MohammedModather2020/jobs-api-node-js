const { StatusCodes } = require('http-status-codes');
const Job = require('../models/job.model');
const { BadRequestError } = require('../errors/index.error');

const getJobs = async (req, res) => {
  res.send('Get all jobs');
};

const getJob = async (req, res) => {
  res.send('Get single job');
};

const createJob = async (req, res) => {
  const { company, position, status } = req.body;
  const createdBy = req.user.userId;
  if (!company) throw new BadRequestError('company is required');
  if (!position) throw new BadRequestError('position is required');
  if (!status) throw new BadRequestError('status is required');
  const job = await Job.create({ company, position, status, createdBy });
  res.status(StatusCodes.CREATED).json({
    code: 0,
    msg: 'Successfully create job',
    data: {
      id: job._id,
      company,
      position,
      status,
      createdBy,
    },
  });
};

const updateJob = async (req, res) => {
  res.send('Update job');
};

const deleteJob = async (req, res) => {
  res.send('Delete job');
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
