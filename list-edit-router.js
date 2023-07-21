const express = require("express");
const tasks = require("./tareas");

const router = express.Router();

router.use(express.json());

const validarCampos = (req, res, next) => {
  
  if (req.method === 'POST' || req.method === 'PUT') {
    const {id, descripcion, estado} = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send("El cuerpo de la solicitud no puede estar vacío.");
    }
    
    if(!id || !descripcion || !estado){
      return res.status(400).send("Por favor valide que todos los campos (id, descripcion y estado) tengan información ");
    }

    if(descripcion.length < 3){
      return res.status(400).send("La descripción no debe ser tan corta.");
    }

    if(estado !== "completado" && estado !== "pendiente" ){
      return res.status(400).send("El estado debe ser completado o pendiente.");
    }
  }

  next();
};

router.use(validarCampos);


router.post("/nueva-tarea/", (req, res) => {
  const nuevaTarea = req.body;

  tasks.push({
    id: Number(nuevaTarea.id),
    descripcion: nuevaTarea.descripcion,
    estado: nuevaTarea.estado
  });
  res.status(200).send("tarea agregada con éxito");
});

router.delete("/eliminar-tarea/:id/", (req, res) => {
  const IdSeleccionado = req.params.id;
  const indiceTarea = tasks.findIndex(
    (item) => item.id === Number(IdSeleccionado)
  );
  if (indiceTarea !== -1) {
    tasks.splice(indiceTarea, 1);
    res.status(200).send("tarea eliminada con éxito");
  } else {
    res.status(404).send("No se encontró la tarea a eliminar");
  }
});

router.put("/actualizar-tarea/:id", (req, res) => {
  const taskId = req.params.id;
  const dataupdatedTask = req.body;
  const updateTask = tasks.find((item) => item.id === Number(taskId));
  updateTask["descripcion"] = dataupdatedTask.descripcion;
  updateTask["estado"] = dataupdatedTask.estado;
  res.status(200).send(`Tarea con ID ${taskId} actualizada exitosamente`);
});

module.exports = router;
