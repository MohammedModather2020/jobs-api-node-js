const { StatusCodes } = require('http-status-codes');
const Job = require('../models/job.model');
const { BadRequestError, NotFoundError } = require('../errors/index.error');

const getJobs = async (req, res) => {
  const createdBy = req.user.userId;
  const jobs = await Job.find({ createdBy }).sort('createdAt');
  res
    .status(StatusCodes.OK)
    .json({ code: 0, msg: 'Successfully get jobs', data: jobs });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with ${jobId}`);
  } else {
    res.status(StatusCodes.OK).json({
      code: 0,
      msg: 'Successfully get job',
      data: job,
    });
  }
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
