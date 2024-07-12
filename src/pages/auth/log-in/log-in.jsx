/* eslint-disable no-unused-vars */
import { Input } from "@/components/ui/input";
import Logo from "../logo";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginUser } from "@/api/auth.api";
import { setUser } from "@/features/auth.slice";
import { useLogin } from "@/hooks/auth.hook";

const LogInSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, "Username or email must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LogInSchema),
  });

  const { mutateAsync: login, isPending, isError, error } = useLogin();

  const LogInUser = async (values) => {
    // Do something with the form values.
    try {
      const user = await login(values);
      if (user) {
        dispatch(setUser(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-14 gap-7 px-4">
      <div className="flex gap-1 justify-center items-center">
        <Logo />
        <span className="font-bold text-lg text-[#AE7AFF] underline underline-offset-4 decoration-dashed decoration-[#AE7AFF]">
          Video Play
        </span>
      </div>
      <form
        onSubmit={handleSubmit(LogInUser)}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full max-w-xs flex flex-col items-center gap-5">
          <div className="w-full space-y-1">
            <Label>UserName or Email</Label>
            <Input
              label={"Username/Email*"}
              type="text"
              placeholder="your@456"
              id={"username"}
              {...register("usernameOrEmail", {
                required: true,
              })}
              className="input"
            />
            {errors.usernameOrEmail && (
              <span className="text-red-500 text-sm">
                {errors.usernameOrEmail.message}
              </span>
            )}
          </div>
          <div className="w-full space-y-1">
            <Label>Password</Label>
            <Input
              label={"Password*"}
              type="password"
              placeholder="*******"
              id={"password"}
              {...register("password", {
                required: true,
              })}
              className="input"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="w-full pt-2 gap-3 flex flex-col">
            <p className="self-end text-xs">
              Dont&rsquo;t have an Account*
              <span className="pl-1 text-[#AE7AFF] font-bold underline decoration-dashed">
                <Link to="/sign-up">👉 Sign-Up</Link>
              </span>
            </p>
            <Button type="submit" className="button" disabled={isPending}>
              {isPending ? "Loading..." : "Log In"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
