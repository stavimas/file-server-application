import { Button, Modal, Form, Input } from 'antd'
import { useState } from 'react';

const { TextArea } = Input;

function FileNameChangeModal({show, onHide, currFileName, currFileComm}) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
        onHide();
        setConfirmLoading(false);
    }, 1000);
    };

    return(
        <>
        <Modal
          title="Изменение имени файла и комментария"
          open={show}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={onHide}
          style={{ maxWidth: 400 }}
        >
            <Form
                name="changeFileNameForm"
                // labelCol={{ span: 4}}
                // wrapperCol={{ span: 16}}
                style={{ maxWidth: 400 }}
                initialValues={{ fileName: currFileName, fileComm: currFileComm }}
                autoComplete="off"
            >
                <Form.Item
                label="Имя файла"
                name="fileName"
                >
                    <Input placeholder={currFileName}/>
                </Form.Item>

                <Form.Item
                label="Комментарий"
                name="fileComm"
                >
                    <TextArea rows={4} maxLength={6} placeholder={currFileComm}/>
                </Form.Item>

                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Изменить
                    </Button>
                </Form.Item> */}
            </Form>
        </Modal>
      </>
    )
}

export default FileNameChangeModal;