# fe-react-to-do-test

```
Dựng layout tổng thể
- Login Page
    - Form .form .form-login
        - Header
            - h1 .title
        - Content
            - Input (label + input)
            - p > message
        - Action
            - Button .btn
        - Footer
            - p. footer-content > span >  a.link

- Dashboard
    - Header
        - h1.logo > img
        - h2 > span: header-meta
    - Page-content
        - Sidebar
            - Header
                - p .username
                - p .email
            - Nav
                - ul .list-menu
                    - li .list-item
                        - a .item
                            img .item-icon
                            p .item-title
            - Footer
                - Button

        - Main
            - div .section-title
                - h2 .title
                - img .icon
            - div .section-content
                - div .section-todos todos
                    - div .section-header
                        - h2 .section-title
                        - action > button
                    - div .section-group group
                        - p .group-label
                        - ul .list-todos
                            li .list-item
                                a .card
                                    div .card-left
                                        icon
                                    div .card-right
                                        h4 .title
                                        p .description
                                        div .card-meta
                                            p .card-status
                                            p .card-date



                - section-summary
                    - div .section-status
                        div .section-header
                            h2 .title
                        ul .list-status

                    - div .section-completed
                        div .section-header
                            h2 .title
                        - ul .list-todos
                            .list-item
                                a .card
                                    div .card-left
                                        icon
                                    div .card-right
                                        h4 .title
                                        p .description
                                        div .card-meta
                                            p .card-status
                                            p .card-date

- View Task Detail
    - section-detail detail
        - section-title
        - section-info info
            info-status
            info-date
        - Description
        - section-action
            ul .list-action
                li .list-item
                    button .icon


- Add Task
    - Form
        - Header
            - Title
            - Link
        - Body
            - Input + label
            - Checkbox
            - TextArea
        - Action
            - Button


CSS

title
card-column
card-active
btn-icon
btn-xl
text-completed
text-progress
text-started
input-xl
cbx-checked
nav-active


Variable
color-black-dark: #1A1A1A
color-black: #000000
color-grey-neutral: #A1A3AB;
color-grey: #747474;
color-red-light: #FF6767;
color-red: #F21E1E
color-white: #FFFFFF;
color-blue: #0225FF;
color-green: #05A301;

font-size-3xl: 36px
font-size-2xl: 32px;
font-size-xl: 24px
font-size-lg: 20px
font-size-md: 16px
font-size-sm: 15px
font-size-xs: 14px
font-size-13:13px
font-size-12:12px
font-size-10: 10px


font-medium: 500
font-normal: 400
font-semibold: 600
font-bold: 700



Data Flow
- Login: 
    - User nhập thông tin vào form. Submit
        - Kiểm tra thông tin có hợp lệ không
    - Kiểm tra data users
        - Nếu ko tồn tại load lại page login => thông báo 
        - Nếu có
            - Lưu data user dùng login vào localStorage
            - Chuyển vào trang dashboard
- Register:
    - User nhập thông tin vào form. Submit
        - Kiểm tra thông tin có hợp lệ không
    - Kiểm tra data users
        - Nếu đã tồn tại, báo lỗi
        - Không tồn tại, lưu data vào localStorage
    - Chuyển sang trang login
        - User nhập thông tin
        - Kiểm tra thông tin
        - Lưu data vào localStorage
        - Chuyển trang dashboard
- Dashboard
 - List data
    - Lấy data list từ localStorage
    - Xử lý data lấy về
        - Phân loại theo ngày
    - Render ra data
 - Status:
    - Lấy data từ localStorage
    - Render qua mảng
        - Tăng biến đếm cho từng status
            - Tạo ra đối tượng đếm với key-value: status
            - Lặp qua mảng để check status, tăng biến đếm của từng status
    - Tính % theo từng status
    - Render UI
 - Completed
    - Lấy data list từ localStorage
    - Kiểm tra status của data
        - Nếu completed thì render
Function
```
