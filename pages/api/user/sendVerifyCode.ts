import { NextApiRequest, NextApiResponse } from 'next'
import verifyCodeClient from '@/server/verifyCode'
import config from '@/server/config'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { phone, templateParamSet } = req.body
    const params = {
        /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
        // 应用 ID 可前往 [短信控制台](https://console.cloud.tencent.com/smsv2/app-manage) 查看
        SmsSdkAppId: config.SmsSdkAppId,
        /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名 */
        // 签名信息可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-sign) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-sign) 的签名管理查看
        SignName: config.SignName,
        /* 模板 ID: 必须填写已审核通过的模板 ID */
        // 模板 ID 可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的正文模板管理查看
        TemplateId: config.TemplateId,
        /* 模板参数: 模板参数的个数需要与 TemplateId 对应模板的变量个数保持一致，若无模板参数，则设置为空 */
        TemplateParamSet: [templateParamSet],//验证码
        /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
         * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
        PhoneNumberSet: [`+86${phone}`],//需要发送的号码
        /* 用户的 session 内容（无需要可忽略）: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
        SessionContext: "",
        /* 短信码号扩展号（无需要可忽略）: 默认未开通，如需开通请联系 [腾讯云短信小助手] */
        ExtendCode: "",
        /* 国际/港澳台短信 senderid（无需要可忽略）: 国内短信填空，默认未开通，如需开通请联系 [腾讯云短信小助手] */
        SenderId: "",
    }
    verifyCodeClient.SendSms(params, (err: any, response: any)=> {
        // 请求异常返回，打印异常信息
        if(err){
            console.log(err)
        }
    })
    
    const statusParams = {
        // 短信应用ID: 短信SdkAppId在 [短信控制台] 添加应用后生成的实际SdkAppId，示例如1400006666
        SmsSdkAppId: "1400684163",
        // 拉取最大条数，最多100条
        Limit: 10,
      }
    verifyCodeClient.PullSmsSendStatus(statusParams, (err: any, response: any)=> {
        // 请求异常返回，打印异常信息
        console.log(err, '失败回执')
        if (err) {
            
            res.status(200).json({
                code: -1,
                data: null,
                success: false,
                message: '验证码发送失败'
            })
        }
        // 请求正常返回，打印response对象
        console.log(response, '回执成功')
        if(response.RequestId){
            res.status(200).json({
                code: 0,
                data: null,
                success: true,
                message: '验证码发送成功'
            })
        }
      })
}