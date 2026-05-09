const express = require('express');

const router = express.Router();

const AuditIssue =
require('../models/AuditIssue');

// GET ALL ISSUES
router.get('/', async (req, res) => {

  try {

    const issues =
      await AuditIssue.find();

    res.json(issues);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// ADD ISSUE
router.post('/', async (req, res) => {

  try {

    const newIssue =
      new AuditIssue(req.body);

    const savedIssue =
      await newIssue.save();

    res.status(201).json(savedIssue);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});

// UPDATE ISSUE
router.put('/:id', async (req, res) => {

  try {

    const updatedIssue =
      await AuditIssue.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedIssue);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

});

// DELETE ISSUE
router.delete('/:id', async (req, res) => {

  try {

    await AuditIssue.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Issue Deleted'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;