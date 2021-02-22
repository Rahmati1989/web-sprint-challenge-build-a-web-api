// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ Message: err.Message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  Actions.get(id)
    .then(actions => {
      if(actions){
        res.status(200).json(actions)
    }
    else{
        res.status(404).json({ Message: "error-404" })
    }
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ Message: err.Message });
    });
});

router.post('/', (req, res) => {
  const actions = req.body
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ Message: "400-missing required information!" });
  }
  Actions.insert(actions)
    .then(actions => {
      res.status(201).json(actions)
    })
    .catch(err => {
      console.log(err)
    });
});
  
router.put('/:id', (req, res) => {
  const  id  = req.params.id
  const change = req.body
  Actions.update(id, change)
    .then(actions => {
      if (req.body.project_id && req.body.description && req.body.notes && req.body.completed){
        res.status(200).json(actions)
    } else {
      res.status(400).json({ Message: "missing required Information" })
    }
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ Message: err.Message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Actions.remove(id)
    .then(actions => {
      if (actions) {
        res.status(200).json({ Message: "Success-action destroyed!" }); 
      } else {
        res.status(404).json({ Message: "404-Could not destroy action with the id"})
      }
    })
    .catch(err => {
      res.status(404).json({ Message: "404-Oops, action could not be destroyed"});
    });
});


module.exports = router
