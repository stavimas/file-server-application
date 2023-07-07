import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'

function TaskComponent() {

    const [dataSource, setDataSource] = useState([])
    const [columns, setColumns] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            let dataSource = [];
            let columns = [];

            //console.log(data);

            for (let objKey of Object.keys(data[0])) {
                let tempObj = {
                    title: objKey.charAt(0).toUpperCase() + objKey.slice(1),
                    dataIndex: objKey,
                    key: objKey,
                    render : (text) => String(text),
                }
                columns.push(tempObj)
            }
            data.forEach(el => {
                dataSource.push(el);
            });

            // console.log(columns);
            // console.log(dataSource);

            setDataSource(dataSource);
            setColumns(columns);
        })
    
        return () => {
        
      }
    }, [])

    return (
        <div>
            {/* <Button 
            style={{
                margin: '0 0 10px 0',
            }}
            >
            Refresh
            </Button> */}
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default TaskComponent;