import React from 'react';
import { Modal, Form, message } from 'antd';
import StripeCheckout from "react-stripe-checkout"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { DepositFunds } from '../../apicalls/transactions';
function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
    const [form] = Form.useForm();
    const dispatch=useDispatch();
    const onToken = async(token) => {
        try {
            dispatch(ShowLoading());
            const response=await DepositFunds({token,amount:
            form.getFieldValue("amount")
        });
        dispatch(HideLoading());
        if(response.success){
            reloadData();
            setShowDepositModal(false);
            message.success(response.message);
        }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };
    return (
        <Modal
            title="Deposit"
            open={showDepositModal}
            onCancel={() => setShowDepositModal(false)}
            footer={null}>
            <div className="flex-col gap-1">
                <Form layout='vertical'
                    form={form}>
                    <Form.Item label="Amount" name="amount"
                        rules={[{
                            required: true,
                            message: "please input amount",
                        },
                        ]}
                    >
                        <input type="number"
                        />
                    </Form.Item>
                    <div className='flex justify-end gap-1'>
                        <button className='primary-outlined-btn'>Cancel</button>
                        <StripeCheckout
                            token={onToken}
                            currency="usd"
                            amount={
                                form.getFieldValue("amount") * 100
                            }
                            shippingAddress
                            stripeKey="pk_test_51NP1KKSJRSVWRWp7e4htmWPbbSwekAka3mmUvNFnEPmpOSmmqlOnk3vWrwmGjktFLG0Qci6nuR0ae9vB1WC1CYKH0043ephyFG"
                        >
                            <button className='primary-contained-btn'>Deposit</button>
                        </StripeCheckout>
                    </div>
                </Form>

            </div>
        </Modal>
    )
}

export default DepositModal