import { Button, Modal, Form, Input } from 'antd'
import { useState } from 'react';

function PictureSizeChangeModal({show, onHide, currentImageSize}) {
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
                initialValues={{ imageSize: currentImageSize }}
                autoComplete="off"
            >
                <Form.Item
                label="Размер изображения"
                name="imageSize"
                >
                    <Input placeholder={currentImageSize}/>
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

export default PictureSizeChangeModal;