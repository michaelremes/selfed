
const Material = require('../../models/Material');



module.exports = (app) => {
  app.post('/api/add/material', (req, res)  => {
    const {body} = req;
    const {
      title,
      type,
      text,
    } = body;

    const newMaterial = new Material();

    newMaterial.title = title;
    newMaterial.type = type;
    newMaterial.text = text;

    newMaterial.save((err, material) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }
      return res.send({
        success: true,
      });
    })

  });




  app.get('/api/materials', (req, res)  => {
    Material.find(function(err, materials) {
      if (err) {
        console.log(err);
      } else {
        res.json(materials);
      }
    });
  });

  app.delete('/api/material/:id', (req, res)  => {
    const testId =  {_id:req.params.id};

      Material.deleteOne(testId, function (err) {
        if(err){
          res.status(500).send('Test not found.');
        }
        res.send('Success');
      })

  });




  app.post('/api/upload/material', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/../../../client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });

  });


};


