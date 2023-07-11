import { Button, Modal, Form, Input, InputNumber } from 'antd'
import { useState } from 'react';

function PictureAngleChangeModal({show, onHide, fileId, currentImageAngle}) {
    
    const onFinish = (e) => {
        console.log(e);

        setTimeout(() => {
            onHide();
        }, 1000);
    };

    return(
        <>
        <Modal
          title="Изменение размеров изображения"
          open={show}
          footer={null}
          onCancel={onHide}
          style={{ maxWidth: 400 }}
        >
            <Form
                name="changePictureSizeForm"
                style={{ maxWidth: 400 }}
                initialValues={{ imageAngle: currentImageAngle }}
                autoComplete="off"
                onFinish={onFinish}
            >
                <Form.Item
                label="Угол поворота в градусах"
                name="imageAngle"
                >
                    <InputNumber style={{width: '100%'}} min={0} max={180} placeholder={currentImageAngle}/>
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

export default PictureAngleChangeModal;