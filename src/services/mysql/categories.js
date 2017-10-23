
const categories = deps => {
	return {
		all: () => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('SELECT * from categories', (error, results) => {
					if (error) {
						errorHandler(error, 'Falha ao listar as categorias', reject)
						return false
					}	

					resolve({ categories: results })
				})
			})
		},
		save: (name) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
					if (error) {
						errorHandler(error, `Falha ao criar a categoria ${name}`, reject)
						return false
					}	

					resolve({ category: { name, id: results.insertId } })
				})
			}) 
		},
		update: (id, name) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('UPDATE categories SET name = ? where id = ?', [name, id], (error, results) => {
					if (error || !results.affectedRows) {
						errorHandler(error, `Falha ao salvar a categoria ${name} - ${id}`, reject)
						return false
					}	

					resolve({ category: { name, id }, affectedRows: results.affectedRows })
				})
			}) 
		},
		del: (id) => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps

				connection.query('DELETE from categories where id = ?', [id], (error, results) => {
					if (error || !results.affectedRows ) {
						errorHandler(error, `Falha ao deletar a categoria de id - ${id}`, reject)
						return false
					}	

					resolve({ message: 'Categoria removida com sucesso!', affectedRows: results.affectedRows })
				})
			}) 
		}
	}
}

module.exports = categories