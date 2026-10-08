import { cx } from "../../utils/cx";
import { Avatar } from "../Avatar/Avatar";
import "./AvatarGroup.css";

export function AvatarGroup({
  avatars = [],
  max = 4,
  size = "md",
  className,
  ...rest
}) {
  const visible = max >= avatars.length ? avatars : avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <ul
      className={cx("viora-avatar-group", className)}
      {...rest}
    >
      {visible.map((avatar, index) => (
        <li
          key={avatar.src ?? avatar.name ?? `avatar-${index}`}
          className="viora-avatar-group__item"
        >
          <Avatar {...avatar} size={size} />
        </li>
      ))}
      {overflow > 0 ? (
        <li
          className="viora-avatar-group__item"
          aria-label={`${overflow} more`}
        >
          <span className={cx("viora-avatar-group__overflow", `viora-avatar-group__overflow--${size}`)}>
            +{overflow}
          </span>
        </li>
      ) : null}
    </ul>
  );
}

export default AvatarGroup;