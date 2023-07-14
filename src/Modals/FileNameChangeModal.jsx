import { Button, Modal, Form, Input } from 'antd'
import { api } from '../consts';

const { TextArea } = Input;

function FileNameChangeModal({show, onHide, fileId, currFileName, currFileComm}) {

    const onFinish = (e) => {
        //console.log(e);
        let tempObj = e;
        if (!e.fileName) { tempObj.fileName = currFileName; }
        if (!e.fileComm) { tempObj.fileComm = currFileComm; }

        //console.log(tempObj);
        let data = {
            "name": tempObj.fileName,
            "comment": tempObj.fileComm
        }

        fetch(`${api}/file-server/${fileId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": true
            },
            body: JSON.stringify(data)
        })

        setTimeout(() => {
            onHide();
        }, 1000);
    }

    return(
        <>
        <Modal
          title="Изменение имени файла и комментария"
          open={show}
          footer={null}
          onCancel={onHide}
          style={{ maxWidth: 400 }}
        >
            <Form
                onFinish={onFinish}
                name="changeFileNameForm"
                style={{ maxWidth: 400 }}
                initialValues={{ fileName: currFileName, fileComm: currFileComm }}
                autoComplete="off"
            >
                <Form.Item
                label="Имя файла"
                name="fileName"
                rules={[{pattern: new RegExp(/^[a-zA-Z0-9]*$/), message: "Некорректное имя файла"}]}
                >
                    <Input placeholder={currFileName}/>
                </Form.Item>

                <Form.Item
                label="Комментарий"
                name="fileComm"
                >
                    <TextArea rows={4} placeholder={currFileComm}/>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Изменить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
      </>
    )
}

export default FileNameChangeModal;