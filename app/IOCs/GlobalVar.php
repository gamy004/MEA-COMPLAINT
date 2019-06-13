<?php

namespace App\IOCs;

class GlobalVar
{
    private $save_array;
    
    public function __construct()
    {
        $this->save_array=[];
    }

    public function set($key, $value)
    {
        $this->save_array[$key] = $value;
    }

    public function assign($key, $assign, $value)
    {
        if (!$this->has($key)) {
            $this->set($key, []);
        }

        $this->save_array[$key][$assign] = $value;
    }

    public function unAssign($key, $assign)
    {
        if ($this->has($key)
            && array_key_exists($assign, $this->get($key))
        ) {
            unset($this->save_array[$key][$assign]);
        }
    }
    
    public function get($key)
    {
        if ($this->has($key)) {
            return $this->save_array[$key];
        } else {
            return null;
        }
    }

    public function has($key)
    {
        return array_key_exists($key, $this->save_array);
    }
    
    public function all()
    {
        return $this->save_array;
    }

    public function clear($numTakeout = .5)
    {
        array_splice(
            $this->save_array,
            count($this->save_array) * $numTakeout
        );
    }
}
