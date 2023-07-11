import { Button, Layout} from 'antd'
import { useState } from 'react';
import FileComponent from './Components/FileComponent';
import TaskComponent from './Components/TaskComponent';

const { Header, Content } = Layout;

function App() {

  const [switchFrameFlague, setSwitchFrameFlague] = useState(false)

  return (
    <Layout style={{height:"100%"}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <Button onClick={() => {setSwitchFrameFlague(false)}}>Files</Button>
        <Button onClick={() => {setSwitchFrameFlague(true)}}>Tasks</Button>
      </Header>
      <Content
        style={{
          padding: '9px 50px',
        }}
      >
        { !switchFrameFlague && <FileComponent/> }
        { switchFrameFlague && <TaskComponent/> }
      </Content>
    </Layout>
  );
}

export default App;
