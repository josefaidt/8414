import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import config from '../aws-exports'
const [{ name: API_NAME }] = config.aws_cloud_logic_custom

export default function HomePage(props) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  async function getData() {
    if (!isLoading) setIsLoading(true)
    if (error) setError()
    if (data) setData()
    try {
      setData(
        await API.get(API_NAME, '/hello', {
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          },
        })
      )
    } catch (error) {
      setError({ message: 'failed calling API', error })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <AmplifySignOut />
      <h1>Hello from the HomePage</h1>
      <button onClick={getData}>reload</button>
      <div>
        {isLoading && <span>Loading...</span>}
        {error && (
          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        )}
        {data && (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
