/**NOTES:
 * - FC stands for functional component
 * - It's a common convetion to declare all interfaces with a capital letter.
 * - By adding [] when calling an interface, we are telling typescript that it's an array of that type.
 * - Typescript can infer the type of data expected for booleans and it's not necessary to declare it.
 */

import axios from "axios";
import { 
  FC, 
  // useEffect, 
  useState } from "react";
import User from "./components/User";
import { AppProps, Users } from "./App.types";



const App: FC<AppProps> = ({ title }) => {
  const [ users, setUsers ] = useState<Users[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ userName, setUserName ] = useState<string>('');

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         'https://randomuser.me/api/?results=10'
  //         );
  //       setUsers(data.results);
  //       console.log(data.results);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   getUsers();
  // }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        'https://randomuser.me/api/?results=10'
        );
      setUsers(data.results);
      console.log(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }

  return (
  <div>
      <h1>{ title } App</h1>
      <button onClick={ handleClick }>Show Users</button>
      <input type="text" onChange={ handleChange } />
      <div>{ userName }</div>
      <ul>
        {isLoading && <div>Loading...</div>}
        {users.map(({ login, name, email }) => (
          <User name={name} email={email} key={login.uuid} />
        ))}
        </ul> 
  </div>
  );
}

export default App;
