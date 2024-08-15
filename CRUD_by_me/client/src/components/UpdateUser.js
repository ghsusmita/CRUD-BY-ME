import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateUser = () => {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/api/updateStudent/' + id)
            .then(result => {
                console.log('User data:', result.data)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
            })
            .catch(err => {
                console.error('Error fetching user data:', err)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedUser = {
            name,
            email,
            age,
        }

        axios.put('http://localhost:4000/api/editStudent/' + id, updatedUser)
            .then(result => {
                console.log('Update successful:', result.data)
                navigate('/')
            })
            .catch(err => {
                console.error('Error updating user:', err)
                alert('Failed to update user. Please try again.')
            })
    }

    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-50 h-100 bg-white rounded p-3 m-auto'>
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder='Enter Your Name'
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-2'>
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Your Email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-2'>
                        <label>Age</label>
                        <input
                            type='number'
                            placeholder='Enter Your Age'
                            className='form-control'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser
