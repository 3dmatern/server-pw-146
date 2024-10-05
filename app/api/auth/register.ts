export async function POST(request: Request) {
    const res = await request.json();
    console.log(res);
    
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    // const passwd = formData.get("passwd");
    // const repasswd = formData.get("repasswd");

    return Response.json({ name, email });
}