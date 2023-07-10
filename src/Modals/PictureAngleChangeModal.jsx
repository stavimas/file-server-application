import { Button, Modal, Form, Input } from 'antd'
import { useState } from 'react';

function PictureAngleChangeModal({show, onHide, currentImageAngle}) {
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
          title="Изменение размеров изображения"
          open={show}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={onHide}
          style={{ maxWidth: 400 }}
        >
            <Form
                name="changePictureSizeForm"
                style={{ maxWidth: 400 }}
                initialValues={{ imageAngle: currentImageAngle }}
                autoComplete="off"
            >
                <Form.Item
                label="Размер изображения"
                name="imageAngle"
                rules={[
                    {
                        type: 'number'
                    }
                ]}
                >
                    <Input placeholder={currentImageAngle}/>
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

export default PictureAngleChangeModal;