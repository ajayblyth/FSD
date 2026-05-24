function MessageBox({userName, textColor})
{

let style = {"color": textColor};
return (
<div>
<p style={style}>UserName: {userName}</p>
</div>

)
}
export default MessageBox;