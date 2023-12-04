export default function Pw({setPw, pw}:{setPw:Function, pw:string}) {
    return(
        <div className="pw_container">
            <div className='pw_text'>비밀번호</div>
            <div>
                <input
                    type="password"
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    className='user_manage_input'>
                </input>
            </div>
        </div>
    )
}