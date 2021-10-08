import { FC } from 'react'

/* const List: FC<{ data: string[] }> = ({ data }) => (
  <ul>
    {data.map(item => <li>{item}</li>)}
  </ul>
) */

const List: FC<{ data: { name: string }[] }> = ({ data }) => (
	<ul>
	  {data.map(({ name }) => <li>{name}</li>)}
	</ul>
  )

export default List
