const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8000

const schemaData = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    Phone: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    hobbies: {
      type: String,
    },
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', schemaData)

//read
app.get('/', async (req, res) => {
  const data = await userModel.find({})
  res.json({ success: true, data: data })
})

//create data
app.post('/create', async (req, res) => {
  console.log(req.body)
  const data = new userModel(req.body)
  await data.save()

  res.send({ success: true, message: 'data save successfully', data: data })
})

//update data
app.put('/update', async (req, res) => {
  const { id, ...rest } = req.body

  const data = await userModel.updateOne({ _id: req.body.id }, rest)
  res.send({ success: true, messsage: 'data updated successfully', data: data })
})

//delete
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const data = await userModel.deleteOne({ _id: id })
  res.send({ success: true, message: 'data deleted successfully', data: data })
})

//database integartion
mongoose
  .connect(URL)
  .then(() => {
    console.log('connected to db')
    app.listen(PORT, () => console.log('server is running'))
  })
  .catch((err) => console.log(err))
