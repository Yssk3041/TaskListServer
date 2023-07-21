const express = require('express');
const tasks = require('./tareas');

const router = express.Router();

const validarParametros = (req, res, next) =>{
    const status = req.params.status;
    if(status !== 'completadas' && status !== 'pendientes' ){
        res.status(400).send("Los parámetros de busqueda no son válidos, seleccione (completadas o pendientes)");
    }
    next();
}

router.get('/', (req, res)=>{
    res.status(200).send(tasks);
  } );


router.get('/:status', validarParametros, (req, res) =>{
    const status = req.params.status;
    if(status === 'completadas'){
        const tasksCompleted = tasks.filter((item) => item.estado === 'completado'); 
        if(tasksCompleted){
            res.json(tasksCompleted);
        }else{
            res.status(404).send("No hay tareas completadas");
        }
    }else  if(status === 'pendientes'){
        const tasksPending = tasks.filter((item) => item.estado === 'pendiente');        
        if(tasksPending){
            res.json(tasksPending);
        }else{
            res.status(404).send("no hay tareas pendientes");
        }
    }
});

module.exports = router;