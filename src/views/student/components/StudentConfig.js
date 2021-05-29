export const viewModel = {
  userName: '',
  name: '',
  surname: '',
  password: '',
  email: '',
  phoneNumber: '',
  studentNumber:'',
  lockoutEnabled: true,
  faceId:'',
  twoFactorEnabled: true,
  address:'',
  librarycard:'',
  roleNames: []
}

export const rules = {
  userName: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  email: [
    { required: false, message: '请输入邮箱地址', trigger: 'blur' }
  ]
}

