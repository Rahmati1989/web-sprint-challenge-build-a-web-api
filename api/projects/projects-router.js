// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const Project = require('./projects-model')

router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  Project.get(id)
    .then(projects => {
      if(projects){
        res.status(200).json(projects)
      } else {
        res.status(404).json({ message: 'error' })
    }
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: err.message });
    });
});


router.post('/', (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'missing required information!' })
  }
  Project.insert(req.body)
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch(err => {
      console.log(err)
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params
  const change = req.body
  Project.update(id, change)
    .then(projects => {
      if (req.body.name && req.body.description && req.body.completed) {
        res.status(200).json(projects)
      }
      else {
        res.status(400).json({ message: "missing required info!" });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Project.remove(id)
    .then(projects => {
      if (projects) {
        res.status(200).json({ message: "success- project destroyed!" })
      }
      else {
        res.status(404).json({ message: "404- Id not found!" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "500- project could not be destroyed" });
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params
  Project.getProjectActions(id)
      .then(projectId => {
          if(projectId){
              res.status(200).json(projectId)
          }
          else{
            res.status(404).json({ message: "404- can not locate the action"});
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({ message: err.message })
      })
})


module.exports = router