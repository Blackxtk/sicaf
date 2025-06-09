const express = require('express');
const cors =  require('cors')
const routerApi = require('./routes');
const { config } = require('./config/config');
const app = express();
const port = config.port;
const { logErrores, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');
const {checkApiKey} = require('./middlewares/authHandler');
const { json } = require('sequelize');


app.use(express.json());

// const whitelist = ['https://localhost:8080',
//                    'http://localhost:8080', 
//                    'http://127.0.0.1:8080', 
//                    'http://192.168.31.84:8080', 
//                    'http://localhost:3000',
//                    'http://192.168.1.214:3000',
//                    'http://192.168.1.214:8080',
//                    'http://192.168.31.84:3000'
//                     ];
// const options = {
//   origin: (origin, callback) =>{
//     console.log('Origin recibido:', origin);
//     if(whitelist.includes(origin)) {
//       callback(null, true);
//     }else{
//       callback(new Error('Conexion denegada'));
//     }
//   }
// }
app.use(cors());

require('./utils/auth')

app.post('/api/v1/sync',(req, res) =>{
  datos = req.body;
  console.log('sync');
  console.log(datos);
  res.status(200).json({
   message: 'Todo ok'
 });

});
routerApi(app);
app.use(logErrores);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, '0.0.0.0', () => {
  console.log('API escuchando en 0.0.0.0:' + port);
});
