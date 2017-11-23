package com.ddjf.wyhz.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;

@Controller
@RequestMapping("/upload")
public class UploadController {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    @RequestMapping("/picture")
    public void uploadPicture(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //获取文件需要上传到的路径
        String path ="D:/upload/test";
        // 用上面传入的这个路径创建一个文件并检查文件是否存在，不存在就创建一个。
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdir();
        }
        request.setCharacterEncoding("utf-8");  //设置编码
        //创建DiskFileItemFactory对象，设置缓冲区大小和临时文件目录
        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setRepository(dir);
        factory.setSizeThreshold(1024 * 1024);
        //使用DiskFileItemFactory 对象创建ServletFileUpload对象
        ServletFileUpload upload = new ServletFileUpload(factory);
        try {
			// 调用ServletFileUpload.parseRequest方法解析request对象，得到一个保存了所有上传内容的List对象。
            List<FileItem> list = upload.parseRequest(request);
            FileItem picture = null;
			// 对list进行迭代，每迭代一个FileItem对象，调用其isFormField方法判断是否是上传文件（false是上传文件的类型，true是普通表单类型）
            for (FileItem item : list) {
                //获取表单的属性名字
                String name = item.getFieldName();
                System.out.println("woshi"+name);// woshiuserId / woshifileData 没一个属性都是一个单独的对象存在。
                //如果获取的表单信息是普通的 文本 信息
                if (item.isFormField()) {
                    //获取用户具体输入的字符串
                    String value = item.getString();
                    request.setAttribute(name, value);
                } else {
                    picture = item;
                }
            }

            // 使用IO流，给文件命名，指定存放文件地址
            String fileName = request.getAttribute("userId") + ".jpg";
            String destPath = path + "/" + fileName;

            //真正写到磁盘上
            File file = new File(destPath);
            OutputStream out = new FileOutputStream(file);
            InputStream in = picture.getInputStream();
            int length = 0;
            byte[] buf = new byte[1024];
            // in.read(buf) 每次读到的数据存放在buf 数组中
            while ((length = in.read(buf)) != -1) {
                //在buf数组中取出数据写到（输出流）磁盘上
                out.write(buf, 0, length);
            }
            in.close();
            out.close();
        } catch (FileUploadException e1) {
            logger.error("", e1);
        } catch (Exception e) {
            logger.error("", e);
        }
    }
}
