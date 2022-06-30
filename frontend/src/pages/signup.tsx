import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";

export default function signup() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
        </div>
        <Form>
          <Input htmlFor="email" text="Email" name="email" id="email" type="text" autoComplete="email" />
          <Input htmlFor="name" text="Name" name="name" id="name" type="string" autoComplete="name" />
          <Input htmlFor="password" text="Password" name="password" id="password" type="text" autoComplete="password" />
          <Button text="Sign up" />
        </Form>
      </div>
    </div>
  )
}