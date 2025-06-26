exports.uploadDocument = (req, res) => {
   
  const {title, description} = req.body
  const {filename, path} = req.file
  

  const sql = 'INSERT INTO documents (title, description, filename, filepath) VALUES (? ? ? ?)' [title, description, filename, path]
  
  sql.query(sql, (err, result) => {
    
  })
}